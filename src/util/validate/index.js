
export const verifyPassword = (password) => {
    let regex = (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    if (!password) return true
    if (regex.test(password)) {
        return true
    }
    return false
}

export const verifyEmail = (email) => {
    // let regex = (/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/)
    // let regex = (/^[\w.+\-]+@gmail\.com$/)
    // chỉ cần @gmail.com
    let regex = (/^[a-z0-9](\.?[a-z0-9]){0,}@g(oogle)?mail\.com$/)
    // sửa {0,} yêu cầu số ký tự trước @
    // let regex = (/([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/)
    if (!email) return true
    if (regex.test(email)) {
        return true
    }
    return false
}

export const verifyOtp = (otp) => {
    let regex = (/^[0-9]{6}$/)
    if (!otp) return true
    if (regex.test(otp)) {
        return true
    }
    return false
}
