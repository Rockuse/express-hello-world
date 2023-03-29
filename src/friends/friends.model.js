function mFriends(data) {
  this.id = data.id;
}

mFriends.prototype.getData = () => (
  {
    id: this.id,
  });

module.exports = mFriends;
