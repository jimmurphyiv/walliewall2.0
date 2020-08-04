update w_user
set first_name = $2,
last_name = $3,
username = $4,
profile_pic = $5
where id = $1