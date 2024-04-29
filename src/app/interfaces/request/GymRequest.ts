import { FormGroup } from "@angular/forms";

export interface GymRequest {
    title:       string;
    email:       string;
    city:        string;
    street:      string;
    number:      string;
    postalCode:  number;
    phoneNumber: string;
}

export function parseGymFormToRequest(formGroup: FormGroup): GymRequest | null {
    if (!formGroup) {
        return null;
    }

    return {
        title: formGroup.get('title')?.value || null,
        email: formGroup.get('email')?.value || null,
        city: formGroup.get('city')?.value || null,
        street: formGroup.get('street')?.value || null,
        number: formGroup.get('number')?.value || null,
        postalCode: formGroup.get('postalCode')?.value || null,
        phoneNumber: formGroup.get('phoneNumber')?.value || null
    };
}