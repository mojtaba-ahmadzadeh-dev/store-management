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
    USER_MOBILE_EXISTS: "این شماره موبایل قبلاً ثبت شده است",
    USER_BAN_SUCCESS: "کاربر با موفقیت مسدود شد",
    USER_UNBAN_SUCCESS: "کاربر با موفقیت از حالت مسدود خارج شد"
}

const CategoryMessage = {
    CATEGORY_CREATED_SUCCESS: "دسته‌بندی با موفقیت اضافه شد",
    CATEGORY_ALREADY_EXISTS: "دسته‌بندی با این عنوان قبلاً وجود دارد",
    CATEGORY_TITLE_REQUIRED: "عنوان دسته‌بندی الزامی است",
    CATEGORY_LIST_RETRIEVED_SUCCESS: "لیست دسته‌بندی‌ها با موفقیت دریافت شد",
    CATEGORY_RETRIEVED_SUCCESS: "دسته‌بندی با موفقیت دریافت شد",
    CATEGORY_NOT_FOUND: "دسته‌بندی پیدا نشد",
    CATEGORY_DELETED_SUCCESS: "دسته‌بندی با موفقیت حذف شد",
    CATEGORY_UPDATED_SUCCESS: "دسته بندی مورد نظر با موفقیت آپدیت شد"
}

const ProductMessage = {
    CREATE_PRODUCT_SUCCESS: "محصول مورد نیاز با موفقیت ایجاد شد",
    GET_PRODUCTS_SUCCESS: "تمام محصولات با موفقیت دریافت شدن",
    GET_PRODUCT_SUCCESS: "محصول با موفقیت دریافت شد",
    PRODUCT_NOT_FOUND: "محصول مورد نظر وجود ندارد",
    DELETE_PRODUCT_SUCCESS: "محصول مورد نظر با موفقیت حذف شد",
    PRODUCR_DELETE_SUCCESS: "محصولات با موفقیت حذف شدن",
    UPDATE_PRODUCT_SUCCESS: "محصول مورد نظر با موفقیت آپدیت شد",
    LIKE_PRODUCT_SUCCESS: "محصول موردنظر با موفقیت لایک شد",
    DISLIKE_PRODUCT_SUCCESS: "محصول مورد نظر با موفقیت نپسندیده شد",
    NO_PRODUCTS_FOUND: "محصولی با این شرایط پیدا نشد",
    BOOKMARK_PRODUCT_SUCCESS: "محصول با موفقیت نشانک‌گذاری شد",
    UNBOOKMARK_PRODUCT_SUCCESS: "نشانک محصول با موفقیت برداشته شد",
}

const BasketMessage = {
    ADDED_SUCCESS: "محصول موردنظر با موفقیت اضافه شد",
    PRODUCT_NOT_FOUND: "محصول مورد نظر یافت نشد",
    INVALID_NEGATIVE_QUANTITY: "نمیتوان مقدار منفی برای محصولی که وجود ندارد وارد کرد",
    REMOVED_SUCCESS: "محصول از سبد خرید حذف شد",
    BASKET_USER: "سبد خرید کاربر",
    BASKET_EMPTY: "سبد خرید خالی است",
    BASKET_CLEARED: "سبد خرید خالی شد",
    BASKET_ALREADY_EMPTY: "سبد خرید از قبل خالی بود"
}

const OrderMessage = {
    ORDER_NOT_FOUND: "سفارش یافت نشد",
    ORDER_SUCCESS: "سفارش با موفقیت ثبت شد",
    ORDER_UPDATE_SUCCESS: "سفارش با موفقیت آپدیت شد",
    ORDER_DELETE_SUCCESS: "سفارش با موفقیت حذف شد",
    GET_ORDERS_SUCCESS: "سفارش‌ها با موفقیت دریافت شدند",
    ADMIN_GET_ALL_ORDERS_SUCCESS: "لیست تمام سفارش‌ها با موفقیت دریافت شد",
    ORDER_EMPTY_BASKET: "سبد خرید شما خالی است",
    ORDER_NOT_AUTHORIZED: "شما اجازه دسترسی به این سفارش را ندارید"
};

const RBACMessage = {
    ROLE_CREATED_SUCCESS: "نقش با موفقیت ایجاد شد",
    ROLE_ALREADY_EXISTS: "Role با عنوان مشخص قبلاً موجود است",
    USER_ROLES_FETCHED: "نقش‌های کاربر با موفقیت دریافت شد",
    PERMISSIONS_FETCHED_SUCCESS: "دسترسی‌ها با موفقیت دریافت شدند",
    PERMISSION_UPDATED_SUCCESS: "دسترسی با موفقیت بروزرسانی شد",
    PERMISSION_DELETED_SUCCESS: "دسترسی با موفقیت حذف شد",
    PERMISSION_NOT_FOUND: "Permission پیدا نشد",
    PERMISSION_ALREADY_EXISTS: 'Permission با نام مشخص قبلاً موجود است',
    ROLES_FETCHED_SUCCESS: "لیست نقش‌ها با موفقیت دریافت شد",
    ROLE_UPDATED_SUCCESS: "نقش با موفقیت بروزرسانی شد",
    ROLE_NOT_FOUND: "Role پیدا نشد",
    ROLE_ALREADY_EXISTS: "Role با این عنوان قبلاً موجود است",
    ROLE_DELETED_SUCCESS: "نقش با موفقیت حذف شد",
    PERMISSION_ASSIGN_SUCCESS: "دسترسی‌ها با موفقیت به نقش اختصاص داده شد",
};

const BlogMessage = {
    CREATE_BLOG_SUCESS: 'بلاگ با موفقیت ایجاد شد',
    SLUG_ALREADY_EXISTS: "این slug قبلا استفاده شده",
    ALL_BLOGS_FETCHED: "لیست بلاگ‌ها با موفقیت دریافت شد",
    BLOG_NOT_FOUND: "بلاگ پیدا نشد",
    BLOG_FETCHED: "جزئیات بلاگ با موفقیت دریافت شد",
}

export {
    AuthMessage,
    UserMessage,
    CategoryMessage,
    ProductMessage,
    BasketMessage,
    OrderMessage,
    RBACMessage,
    BlogMessage
};