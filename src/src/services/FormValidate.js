export default class FormValidate {
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    hasNullableValue() {
        this.errors = [];
        
        for (let field of this.data) {
            if (!field.value) {
                this.errors.push({
                    fieldName: field.name
                });
            }
        }

        return this.errors.length > 0;
    }
}