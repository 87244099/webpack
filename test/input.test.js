import Input from "../src/components/input.vue";
import Vue from "vue";
import sinon from 'sinon'

import { createLocalVue, mount } from "@vue/test-utils";


Vue.component("my-input", Input);

// Q：test和describe的区别是什么？
// test 测试文件中所需的test就是运行测试的方法。
// describe 创建一个将几个相关测试组合在一起的模块
// it expect等同

// Q：怎么定义组件的前缀？
// 1、Vue.component(name, component);
// 2、component.name = xxx;
// case: https://blog.csdn.net/junhuahouse/article/details/109138646
// Q：饿了么里面为什么不用nextTick，要自己写一个delay去替代

describe("Input", ()=>{

    describe("default props", ()=>{
    
        let defaultValueDef = {
            type: "text",
            placeholder:undefined,
            disabled:false,
            id:undefined,
            maxlength:undefined,
            id:undefined,
            readonly:false,
            resize:false
        };
        Object.keys(defaultValueDef).forEach(key=>{
            test(`default ${key}`, ()=>{
                let comp ={
                    template: `
                        <my-input ref="my-input"></my-input>
                    `
                };
                let compWraper = mount(comp);
                expect(compWraper.findComponent({ref:"my-input"}).props()[key]).toEqual(defaultValueDef[key]);
            })
        });
        
    });

    describe("props value match", ()=>{
        let valueDef = {
            type: "number",
            placeholder:"请输入xxx",
            disabled:true,
            id:"myId",
            maxlength:10,
            readonly:true,
            resize:true
        };

        Object.keys(valueDef).forEach(key=>{
            let value = valueDef[key];

            test(`props ${key} match`, ()=>{
                let comp ={
                    template: `
                        <my-input ref="my-input"
                            :${key}="${key}"
                        ></my-input>
                    `,
                    data(){
                        return {
                            [key]:value
                        }
                    }
                };
                let compWraper = mount(comp);
                expect(compWraper.findComponent({ref:"my-input"}).props()[key]).toEqual(value);
            })        
            
        });
    })

    describe("props value change react", ()=>{
        let valueChangedDef = {
            type: ["number", "text"],
            placeholder: ["请输入xxx", "请重新输入手机号"],
            disabled:[true, false],
            id:["myId", "myId2"],
            maxlength:[10, 20],
            readonly:[true, false],
            resize:[true, false]
        };
        Object.keys(valueChangedDef).map(key=>{
            let valueList = valueChangedDef[key];
            let firstValue = valueList[0];
            let secValue = valueList[1];
            test(`props ${key} change react`, async ()=>{
                let comp ={
                    template: `
                        <my-input ref="my-input"
                            :${key}="${key}"
                        ></my-input>
                    `,
                    data(){
                        return {
                            [key]:firstValue
                        }
                    }
                };
                let compWraper = mount(comp);
                let inputWraper =compWraper.findComponent({ref:"my-input"});
                expect(inputWraper.props()[key]).toEqual(firstValue);

                // 对data进行修改，看内部是是否同步 
                compWraper.vm[key] = secValue;
                await Vue.nextTick();
                expect(inputWraper.props()[key]).toEqual(secValue);
                

            });
        })
    });


    // // 测试type的取值范围
    // test(`prop type range`, ()=>{
        
    //     let valueDef = {
    //         default: "text",
    //         range:["text", "number", "textarea"]
    //     };
    //     /**
    //      * 输入类型不符合 case: 886; expect: error
    //      * 输入类型符合 
    //      *  text
    //      *  number
    //      *  textarea
    //      *  invalidType：预期修正为 text
    //     */


    //     let comp ={
    //         template: `
    //             <my-input ref="my-input"
    //                 :${key}="${key}"
    //             ></my-input>
    //         `,
    //         data(){
    //             return {
    //                 [key]:firstValue
    //             }
    //         }
    //     };


    // });

    // test("test type number", ()=>{
    //     let comp ={
    //         template: `
    //             <my-input ref="my-input"
    //                 :min="min"
    //                 :max="max"
    //                 v-model=
    //             ></my-input>
    //         `,
    //         data(){
    //             return {
    //                 // [key]:firstValue
    //             }
    //         }
    //     };

    // })

    test("test v-model", async()=>{
        let comp ={
            template: `
                <my-input ref="my-input"
                    v-model="value"

                    @change="change"
                ></my-input>
            `,
            data(){
                return {
                    value: "Wgd"
                }
            },
            methods:{
                change(){
                    console.log("change", arguments);
                }
            }
        };

        let testNewValue = "hjl";
        let compWraper = mount(comp);
        let inputElemWraper = compWraper.findComponent({ref:"my-input"}).findComponent({ref:"input"});
        inputElemWraper.element.value = testNewValue;
        await inputElemWraper.trigger("input");
        expect(compWraper.vm.value).toEqual(testNewValue);
    });

    describe("test value in inputDom", ()=>{
        let valueDef = {
            type: ["type", "textarea"],
            value: ["value", "23333"],
            placeholder: ["placeholder", "请输入收货人信息"],
            disabled: ["disabled", true],
            maxlength: ["maxlength", 4, "maxLength"],
            readonly: ["readonly", true, "readOnly"]
        };
        Object.keys(valueDef).forEach(key=>{
            let value = valueDef[key];
            test(`test value dom ${key}`, ()=>{
               testInputValue(...value);
            })
        });
    });

    test("test event focus", async()=>{
        let focusFn = jest.fn(function(event){
            expect(event).toBeInstanceOf(Event);
        });            
        let comp ={
            template: `
                <my-input ref="my-input"
                    v-model="value"

                    @focus="focus"
                ></my-input>
            `,
            data(){
                return {
                    value: "Wgd"
                }
            },
            methods:{
                focus: focusFn
            }
        };

        let compWraper = mount(comp);
        let inputElemWraper = compWraper.findComponent({ref:"my-input"}).findComponent({ref:"input"});
        await inputElemWraper.trigger("focus");
        expect(focusFn).toBeCalledWith(
            expect.any(Event)
        );
    });

    test("test event blur", async()=>{
        let blurFn = jest.fn(function(event){
            expect(event).toBeInstanceOf(Event);
        });            
        let comp ={
            template: `
                <my-input ref="my-input"
                    v-model="value"

                    @blur="blur"
                ></my-input>
            `,
            data(){
                return {
                    value: "Wgd"
                }
            },
            methods:{
                blur: blurFn
            }
        };

        let compWraper = mount(comp);
        let inputElemWraper = compWraper.findComponent({ref:"my-input"}).findComponent({ref:"input"});
        await inputElemWraper.trigger("blur");
        expect(blurFn).toBeCalledWith(
            expect.any(Event)
        );
    });


    /* Q：怎么测试函数的参数？
        expect(changeFn).toBeCalledWith(
            expect.any(String)
        );
    */
    test("test event change", async()=>{
        let changeFn = jest.fn((aaa)=>{
            console.log(aaa);
        });            
        let comp ={
            template: `
                <my-input ref="my-input"
                    v-model="value"

                    @change="change"
                ></my-input>
            `,
            data(){
                return {
                    value: "Wgd"
                }
            },
            methods:{
                change: changeFn
            }
        };

        let compWraper = mount(comp);
        let inputElemWraper = compWraper.findComponent({ref:"my-input"}).findComponent({ref:"input"});
        await inputElemWraper.trigger("change");
        expect(changeFn).toBeCalledWith(
            expect.any(String)
        );
    });

})


function testInputValue(prop, value, alias){
    let comp ={
        template: `
            <my-input ref="my-input"
                :${prop}="${prop}"
            ></my-input>
        `,
        data(){
            return {
                // value: "aaaaaaaa",
                [prop]: value
            }
        }
    };
    let compWraper = mount(comp);
    let inputElemWraper = compWraper.findComponent({ref:"my-input"}).findComponent({ref:"input"});
    expect(inputElemWraper.element[alias || prop]).toEqual(value);
}