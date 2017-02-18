const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const url = require('url');
const moment = require('moment');

const usersModel = require('./usersModel.js');
const machinesModel = require('./machinesModel.js');
const schedulesAnnonymousModel = require('./schedulesAnnonymousModel.js');
const schedulesModel = require('./schedulesModel.js');
const helper = require('./helper.js');

module.exports = {
    showDashboard : function (connection, user, callback) {
        console.log(user.address);
        if (user.address == 'NULL' || user.zip == 'NULL' || user.city == 'NULL' || user.state == 'NULL' || user.country == 'NULL') {
            // If any fields of the user is missing, then return
            callback({message: helper.MISSING_FIELDS_OF_USER_ADDRESS, schedules: null});
        } else {
            // Find all machines in the same address
            var queryString1 = 'SELECT * FROM machines WHERE \
                                address=? AND zip =? AND city=? AND state=? AND country=?;';
            // console.log(user);
            connection.query(queryString1, [user.address, user.zip, user.city, user.state, user.country], function(err, rows) {
                if (err) {
                    callback({message: helper.FAIL, schedules: null});
                } else {
                    var schedules = [];
                    // console.log(rows);
                    var times = 0;
                    for (var i = 0; i < rows.length; i++) {
                        // Find schedules of each machine
                        var machine_id = rows[i].machine_id;
                        const queryString2 = 'SELECT * FROM schedules_annonymous WHERE machine_id=?';
                        connection.query(queryString2, machine_id, function(err, rows2) {
                            if (err) {
                                // Fail, return
                            } else {
                                // console.log(rows2);
                                schedules.push(rows2);
                                // If this is the last time of the iteration, then callback
                                if (times == rows.length - 1) {
                                    callback({message: helper.SUCCESS, schedules: schedules});
                                }
                                times += 1;
                            }
                        });
                    }
                }
            });
        }
    }
}
