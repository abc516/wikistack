var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');
// var db = new Sequelize('postgres://localhost:5432/wikistack', {
//     logging: false
// });

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    urlTitle: {
        type: Sequelize.STRING,  allowNull: false, validate: {isUrl: true}
    },
    content: {
        type: Sequelize.TEXT, allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE, defaultValue: Sequelize.Now
    }},{
      getterMethods: {
          route: function () {
            var urlArr = this.urlTitle.split("/")
            return  /wiki/ + urlArr[urlArr.length-1]
        }
      }
    }
    // getterMethods: {
    //     route: function () {return '/wiki/' + this.urlTitle}
    // }
);

var User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}
    }
});

module.exports = {
  Page: Page,
  User: User
};
