insert into w_user (
    first_name,
    last_name,
    username, 
    email,
    password,
    profile_pic
    )VALUES(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6  
)
RETURNING *;