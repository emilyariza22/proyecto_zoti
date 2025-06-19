const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];

    if (password.length < minLength) {
        errors.push(`La contraseña debe tener al menos ${minLength} caracteres`);
    }
    if (!hasUpperCase) {
        errors.push('La contraseña debe contener al menos una letra mayúscula');
    }
    if (!hasNumber) {
        errors.push('La contraseña debe contener al menos un número');
    }
    if (!hasSpecialChar) {
        errors.push('La contraseña debe contener al menos un carácter especial');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validatePassword
};
