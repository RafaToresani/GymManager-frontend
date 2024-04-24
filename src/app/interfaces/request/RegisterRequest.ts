import { FormGroup } from "@angular/forms";

export interface RegisterRequest {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    city: string;
    street: string;
    numberStreet: string;
    postalCode: number;
    phoneNumber: string;
}

export function parseRegisterFormToRequest(formGroup: FormGroup): RegisterRequest | null {
    if (!formGroup) {
        return null;
    }

    return {
        password: formGroup.get('password')?.value || '',
        email: formGroup.get('email')?.value || '',
        firstName: formGroup.get('firstName')?.value || '',
        lastName: formGroup.get('lastName')?.value || '',
        city: formGroup.get('city')?.value || '',
        street: formGroup.get('street')?.value || '',
        numberStreet: formGroup.get('numberStreet')?.value || '',
        postalCode: formGroup.get('postalCode')?.value || 0,
        phoneNumber: formGroup.get('phoneNumber')?.value || ''
    };
}
