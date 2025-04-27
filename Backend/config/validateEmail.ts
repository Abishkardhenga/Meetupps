const validateEmail = (email: string): boolean => {
    // Regular expression for validating an Email
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/;
    return re.test(String(email).toLowerCase());
}
export default validateEmail;