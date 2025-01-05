export interface BaseResponse {
    success: boolean;
    message: string;
}

export interface SuccessResponse<T = undefined> extends BaseResponse {
    data?: T;
}

export interface FieldError {
    field: string;
    message: string;
}

export interface ErrorResponse extends BaseResponse {
    reasons?: FieldError[];
}

export interface ReducerErrorObject {
    message: string;
    reasons?: FieldError[];
}

//  possible keys in response [status, success, message, reasons, data];
/**
 // * status compulsory will come
 // * status not required to handle
 // * message will also come compulsory until now
 // * is success then data will come
 // * if not success then reasons will come
 *
{
    "status": 401,
    "success": false,
    "message": "Validation Failed.",
    "reasons": [
        {
            "message": "Please Provide Password",
            "field": "password"
        },
        {
            "message": "Invalid email",
            "field": "email"
        }
    ]
}

{
    "status": 401,
    "success": false,
    "message": "Invalid Credentials"
}

{
    "success": true,
    "message": "Login Successfull."
}

{
    "status": 401,
    "success": false,
    "message": "Permission denied."
}

{
    "success": true,
    "message": "Access Token Provided"
}

{
    "success": true,
    "message": "data displayed successfully.",
    "data": {
        "list": [
            {
                "_id": "660aa028b754e99f5885260f",
                "question": "Get single post with title 'Post 202'",
                "answer": "collection(\"posts\").findOne({title:\"Post 202\"})",
                "questionId": 1
            },
            {
                "_id": "66bba071940c2a30ada50e70",
                "question": "Get single post with title 'Post 202'",
                "answer": "collection(\"posts\").findOne({title:\"Post 202\"})",
                "questionId": 2
            }
        ]
    }
}
**/
