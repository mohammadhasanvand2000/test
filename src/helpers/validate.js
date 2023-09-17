export const validate = (data,type) => {

    const errors = {};


    
    
    if (!data.password) {
        errors.password = "رمز عبور خود را وارد کنید"
    } else if (data.password.length < 8) {
        errors.password = "رمز عبور باید بیش از 8 کرکتر باشد"
    } else {
        delete errors.password
    }
    
    if (!data.phoneNumber) {
        errors.phoneNumber = "شماره تلفن خود را وارد کنید"
    } else if (!/^(\+98|0)?9\d{9}$/.test(data.phoneNumber)) {
        errors.phoneNumber = "لطفا یک شماره تماس معتبر وارد کنید"
    } else {
        delete errors.phoneNumber
    }

    if (type === "signup") {
        if (!data.name) {
            errors.name = "نام خود را وارد کنید"
        } else {
            delete errors.name
        }
        
        if (!data.email) {
            errors.email = "آدرس ایمیل خود را وارد کنید"
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "لطفا یک آدرس ایمیل معتبر وارد کنید"
        } else {
            delete errors.email
        }


        if (!data.password) {
            errors.password = "رمز عبور خود را وارد کنید"
        } else if (data.password.length < 8) {
            errors.password = "رمز عبور باید بیش از 8 کرکتر باشد"
        } else {
            delete errors.password
        }

            if (!data.confirmPassword) {
                errors.confirmPassword = "تکرار رمز عبور خود را وارد کنید"
            } else if (data.confirmPassword !== data.password) {
                errors.confirmPassword = "رمز عبور و تکرار آن باهم برابر نیستند"
            } else {
                delete errors.confirmPassword
            }
        }


        return errors;
    }
    

