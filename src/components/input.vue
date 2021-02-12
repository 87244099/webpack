<template>
    <div>
        <template v-if="type==='number'">
            <input ref="input"
                :type="type"
                :value="value"
                :disabled="disabled"
                :placeholder="placeholder"
                :id="id"
                :maxlength="maxlength"
                :readonly="readonly"

                @input="input($event.target.value)"
                @change="change"

                @focus="$emit('focus', $event)"
                @blur="$emit('blur', $event)"
            />
        </template>
        <template v-else-if="type==='textarea'">
            <textarea ref="input"
                :value="value"
                :disabled="disabled"
                :placeholder="placeholder"
                :id="id"
                :maxlength="maxlength"
                :readonly="readonly"
                
                @input="input($event.target.value)"
                @change="change"
                @focus="$emit('focus', $event)"
                @blur="$emit('blur', $event)"
            ></textarea>
        </template>
        <template v-else>
            <input ref="input"
                :type="type"
                :value="value"
                :disabled="disabled"
                :placeholder="placeholder"
                :id="id"
                :maxlength="maxlength"
                :readonly="readonly"
                
                @input="input($event.target.value)"
                @change="change"
                @focus="$emit('focus', $event)"
                @blur="$emit('blur', $event)"
            />
        </template>
    </div>
    
</template> 
<script>
export default {
    model:{
        prop:"value",
        event: "input"
    },
    props:{
        type: {
            type: String,
            default: "text"
        },
        value: {
            type:String,
            default: ""
        },
        placeholder: String,
        disabled: Boolean,
        id: String,
        maxlength: Number,
        readonly: Boolean,
        resize: Boolean
    },
    data(){
        return {}
    },
    methods:{
        change($event){
            this.$emit("change", $event.target.value)
        },
        input(value){
            this.$emit('input', value)
        }
    }
};
</script>