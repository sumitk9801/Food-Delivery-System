# TODO List for Resolving BSONError in placeOrder

- [x] Add validation for `item.foodId` in `placeOrder` function using `mongoose.Types.ObjectId.isValid(item.foodId)`
- [x] If `foodId` is invalid, return a 400 error response with message "Invalid foodId"
