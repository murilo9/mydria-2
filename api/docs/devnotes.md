principles:
  - functional first, use classes only when they really help
  - CLEAN is overkill and overuses layering (lasagna code)

layers:
  - db: functions that do database queires only
  - validators: functions that receive the request and validate its data
  - authorizators: functions that receive the request and verify if the requester has authorization for that flow
  - domain: holds functions that do any other nice stuff for us
  - controllers: make flows happen. They receive req and res objects

## Controllers

The core layer of the application is the controller. Controllers are functions that
make a flow happen (like reacting to a comment, sharing a post or following someone).
Controllers have a **handle** method that receives the request object, and they should return a *Result* of something.
Controllers may be assertive and/or restrict access. Assertive controllers have a **validator** method that is executed after handle, which is used to validate the request object on current flow. Restrict access controllers have a **authorizator** method that is executed after handle (and after validator as well) which is used to check requester's access permission on the current flow. Both validator and authorizator methods can emit results that may shortcut the request flow if necessary.
The **makeRoute** helper just receives a controller as parameter and returns a express-acceptable middleware function (with req, res and next parameters).

-- Use cases --

sign up
  - validate form
  - create user (insert on database)
  - send verification mail

create post
  - clean form
  - create post (insert on database)

create comment
  - clean form
  - create comment (insert on database)
  - send notification

edit post
  - clean form
  - edit post (update database)

edit comment
  - clean form
  - edit comment (update database)

react to post
  - update/remove/insert on database
  - create/update notification

follow
  - follow user (update database)
  - create notification

unfollow
  - unfollow user (update database)