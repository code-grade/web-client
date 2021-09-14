
const strong_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
const strong_password_help_text = "chars 6 to 20, upper, lower, special characters needed"

const capitalize = /^([A-Z][a-z]*)(\s[A-Z][a-z]*)*\s*$/
const capitalize_help_text = "should be in capitalize format"

const email_address = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
const email_address_help_text = "invalid email address"

const telephone_number = /^(\+\d\d|00\d\d|0)\d{9}$/
const telephone_number_help_text = "invalid telephone number"

const youtube_link = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/
const youtube_link_help_text = "invalid youtube link"

export default {
    required: () => (s) => Boolean(s?.length > 0) || "required",
    min: (min) => (s) => Boolean(s?.length >= min) || `should be at least ${min} characters long`,
    max: (max) => (s) => Boolean(s?.length < max) || `should be less than ${max} characters`,
    email: () => (s) => Boolean(s?.match(email_address)) || email_address_help_text,
    telephone: () => (s) => Boolean(s?.match(telephone_number)) || telephone_number_help_text,
    no_spaces: () => (s) => Boolean(!s?.match(/\s/g)) || "white spaces are not allowed",
    strong_password: () => (s) => Boolean(s?.match(strong_password)) || strong_password_help_text,
    capitalize: () => (s) => Boolean(s?.match(capitalize)) || capitalize_help_text,
    integer: () => (s) => Boolean(s?.match(/^\d+$/)) || "Only integer values are allowed",
    decimal: () => (s) => Boolean(s?.match(/^\d+(\.\d+)?$/)) || "Only numerical values are allowed",
    youtube: () => (s) => Boolean(s?.match(youtube_link)) || youtube_link_help_text,
    greater: (val) => (s) => Number(s) > val || "too small"
}