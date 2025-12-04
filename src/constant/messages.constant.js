const AuthMessage = {
    OTP_SENT_SUCCESS: "کد تایید با موفقیت ارسال شد.",
    MOBILE_REQUIRED: "وارد کردن شماره موبایل الزامی است",
    MOBILE_INVALID: "شماره موبایل وارد شده نامعتبر است",
    USER_NOT_FOUND: "کاربر با این شماره موبایل یافت نشد.",
    OTP_CODE_NOT_EXPIRED: "کد تایید هنوز منقضی نشده است.",
    OTP_VERIFIED_SUCCESS: "کد تأیید با موفقیت بررسی شد",
    CODE_REQUIRED: "وارد کردن کد تأیید الزامی است",
    CODE_INVALID: "کد تأیید وارد شده نامعتبر است",
    CODE_LENGTH_INVALID: "طول کد تأیید باید ۶ رقم باشد",
    OTP_CODE_INCORRECT: "کد تأیید نادرست است",
    OTP_CODE_EXPIRED: "کد تأیید منقضی شده است",
    OTP_CODE_NOT_FOUND: "کد تأیید یافت نشد",
    REFRESH_TOKEN_INVALID: "توکن معتبر نیست",
    REFRESH_TOKEN_EXPIRED: "رفرش توکن نامعتبر یا منقضی شده است",
    REFRESH_TOKEN_NOT_FOUND: "رفرش توکن پیدا نشد",
    REFRESH_TOKEN_SUCCESS: "توکن با موفقیت رفرش شد",
    ACCESS_TOKEN_INVALID: "توکن دسترسی معتبر نیست",
    GET_ME_SUCCESS: "اطلاعات کاربر با موفقیت دریافت شد",
    LOGOUT_SUCCESS: "خروج با موفقیت انجام شد"
};

const UserMessage = {
    USERS_LIST_SUCCESS: "لیست کاربران با موفقیت دریافت شد",
    USER_NOT_FOUND: "کاربری با همچین آیدی وجود ندارد",
    USER_SUCCESS: "کاربر با موفقیت دریافت شد",
    USER_UPDATE_SUCCESS: "کاربر موردنظر با موفقیت آپدیت شد",
    USER_UPDATE_ROLE_SUCCESS: "نقش کاربر با موفقیت عوض شد",
    USER_DELETE_SUCCESS: "کاربر مورد نظر با موفقیت حذف شد",
    USER_MOBILE_EXISTS: "این شماره موبایل قبلاً ثبت شده است"
}

export { AuthMessage, UserMessage };