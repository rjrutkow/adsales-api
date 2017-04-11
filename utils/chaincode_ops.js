'use strict';
/*******************************************************************************
 * Copyright (c) 2015 IBM Corp.
 *
 * All rights reserved.
 *
 * This module provides wrappers for the operations on chaincode that this demo
 * needs to perform.
 *
 * Contributors:
 *   Dale Avery - Initial implementation
 *
 * Created by davery on 11/8/2016.
 *******************************************************************************/

// For logging
var TAG = 'chaincode_ops:';

var async = require('async');
var debug = false;

/**
 * A helper object for interacting with the commercial paper chaincode.  Has functions for all of the query and invoke
 * functions that are present in the chaincode.
 * @param chain A configured hfc chain object.
 * @param chaincodeID The ID returned in the deploy request for this chaincode.
 * @constructor
 */
function CPChaincode(chain, chaincodeID) {
    if (!(chain && chaincodeID))
        throw new Error('Cannot create chaincode helper without both a chain object and the chaincode ID!');
    this.chain = chain;
    this.chaincodeID = chaincodeID;

    // Add an optional queue for processing chaincode related tasks.  Prevents "timer start called twice" errors from
    // the SDK by only processing one request at a time.
    this.queue = async.queue(function (task, callback) {
        task(callback);
    }, 1);
}
module.exports.CPChaincode = CPChaincode;

CPChaincode.prototype.releaseInventory = function (uid, inputArgs, cb) {
    if (debug) console.log(TAG, '- releaseInventory uid: ', uid);
    if (debug) console.log(TAG, '- releaseInventory input args: ', JSON.stringify(inputArgs));
    var releaseInventory = {
        chaincodeID: this.chaincodeID,
        fcn: 'releaseInventory',
        args: inputArgs
    };

    invoke(this.chain, uid, releaseInventory, function (err, result) {
        if (err) {
            console.error(TAG, 'failed releaseInventory:', err);
            return cb(err);
        }

        //console.log(TAG, 'releaseInventory successfully:', result.toString());
        if (debug) console.log(TAG, 'releaseInventory successfully:', JSON.stringify(result));
        cb(null, result);
    });
}

CPChaincode.prototype.queryPlaceOrders = function (enrollID, inputArgs, cb) {
    if (debug) console.log(TAG, 'queryPlaceOrders - chaincode_ops:', enrollID);

    var queryPlaceOrders = {
        chaincodeID: this.chaincodeID,
        fcn: 'queryPlaceOrders',
        args: inputArgs
    };

    query(this.chain, enrollID, queryPlaceOrders, function (err, qResponse) {
        if (err) {
            console.error(TAG, 'failed to get queryPlaceOrders:', err);
            return cb(err);
        }

        if (debug) console.log(TAG, 'retrieved queryPlaceOrders information:', qResponse.toString());
        cb(null, qResponse.toString());
    });
};

CPChaincode.prototype.placeOrders = function (uid, inputArgs, cb) {
    if (debug) console.log(TAG, '- placeOrders uid: ', uid);
    if (debug) console.log(TAG, '- placeOrders input args: ', JSON.stringify(inputArgs));
    var placeOrders = {
        chaincodeID: this.chaincodeID,
        fcn: 'placeOrders',
        args: inputArgs
    };

    invoke(this.chain, uid, placeOrders, function (err, result) {
        if (err) {
            console.error(TAG, 'failed placeOrders:', err);
            return cb(err);
        }

        if (debug) console.log(TAG, 'placeOrders successfully:', JSON.stringify(result));
        cb(null, result);
    });
}

CPChaincode.prototype.queryAdspotsToMap = function (enrollID, inputArgs, cb) {
    if (debug) console.log(TAG, 'queryAdspotsToMap - chaincode_ops:', enrollID);

    var queryAdspotsToMap = {
        chaincodeID: this.chaincodeID,
        fcn: 'queryAdspotsToMap',
        args: inputArgs
    };

    query(this.chain, enrollID, queryAdspotsToMap, function (err, qResponse) {
        if (err) {
            console.error(TAG, 'failed to get queryAdspotsToMap:', err);
            return cb(err);
        }

        if (debug) console.log(TAG, 'retrieved queryAdspotsToMap information:', qResponse.toString());
        cb(null, qResponse.toString());
    });
};

CPChaincode.prototype.mapAdspots = function (uid, inputArgs, cb) {
    if (debug) console.log(TAG, '- mapAdspots uid: ', uid);
    if (debug) console.log(TAG, '- mapAdspots input args: ', JSON.stringify(inputArgs));
    var mapAdspots = {
        chaincodeID: this.chaincodeID,
        fcn: 'mapAdspots',
        args: inputArgs
    };

    invoke(this.chain, uid, mapAdspots, function (err, result) {
        if (err) {
            console.error(TAG, 'failed mapAdspots:', err);
            return cb(err);
        }

        if (debug) console.log(TAG, 'mapAdspots successfully:', JSON.stringify(result));
        cb(null, result);
    });
}

CPChaincode.prototype.queryAsRun = function (enrollID, inputArgs, cb) {
    if (debug) console.log(TAG, 'queryAsRun - chaincode_ops:', enrollID);

    var queryAsRun = {
        chaincodeID: this.chaincodeID,
        fcn: 'queryAsRun',
        args: inputArgs
    };

    query(this.chain, enrollID, queryAsRun, function (err, qResponse) {
        if (err) {
            console.error(TAG, 'failed to get queryAsRun:', err);
            return cb(err);
        }

        if (debug) console.log(TAG, 'retrieved queryAsRun information:', qResponse.toString());
        cb(null, qResponse.toString());
    });
};


CPChaincode.prototype.reportAsRun = function (uid, inputArgs, cb) {
    if (debug) console.log(TAG, '- reportAsRun uid: ', uid);
    if (debug) console.log(TAG, '- reportAsRun input args: ', JSON.stringify(inputArgs));
    var reportAsRun = {
        chaincodeID: this.chaincodeID,
        fcn: 'reportAsRun',
        args: inputArgs
    };

    invoke(this.chain, uid, reportAsRun, function (err, result) {
        if (err) {
            console.error(TAG, 'failed reportAsRun:', err);
            return cb(err);
        }

        if (debug) console.log(TAG, 'reportAsRun successfully:', JSON.stringify(result));
        cb(null, result);
    });
}


CPChaincode.prototype.queryTraceAdSpots = function (enrollID, inputArgs, cb) {
    if (debug) console.log(TAG, 'queryTraceAdSpots - chaincode_ops:', enrollID);

    var queryTraceAdSpots = {
        chaincodeID: this.chaincodeID,
        fcn: 'queryTraceAdSpots',
        args: inputArgs
    };

    query(this.chain, enrollID, queryTraceAdSpots, function (err, qResponse) {
        if (err) {
            console.error(TAG, 'failed to get queryTraceAdSpots:', err);
            return cb(err);
        }

        if (debug) console.log(TAG, 'retrieved queryTraceAdSpots information:', qResponse.toString());
        cb(null, qResponse.toString());
    });
};

/**
 * Query the chaincode for the full list of commercial papers.
 * @param enrollID The user that the query should be submitted through.
 * @param cb A callback of the form: function(error, commercial_papers)
 */
CPChaincode.prototype.getBlockchainRecord = function (enrollID, recordKey, cb) {
    if (debug) console.log(TAG, 'getting commercial papers');

    // Accounts will be named after the enrolled users
    var getPapersRequest = {
        chaincodeID: this.chaincodeID,
        fcn: 'getBlockchainRecord',
        args: [recordKey]
    };

    query(this.chain, enrollID, getPapersRequest, function (err, papers) {

        if (err) {
            console.error(TAG, 'failed to getPapers:', err);
            return cb(err);
        }

        if (debug) console.log(TAG, 'got papers');
        cb(null, papers.toString());
    });
};

/**
 * Helper function for invoking chaincode using the hfc SDK.
 * @param chain A hfc chain object representing our network.
 * @param enrollID The enrollID for the user we should use to submit the invoke request.
 * @param requestBody A valid hfc invoke request object.
 * @param cb A callback of the form: function(error, invoke_result)
 */
function invoke(chain, enrollID, requestBody, cb) {

    doInvoke(chain, enrollID, requestBody, function (err, result) {
        if (err) {
            console.error(TAG, '1st try - failed invoke:', err);
            doInvoke(chain, enrollID, requestBody, function (err2, result2) {
                if (err2) {
                    console.error(TAG, '2nd try - failed invoke:', err2);
                    return cb(err2);
                }

                //console.log(TAG, 'releaseInventory successfully:', result.toString());
                if (debug) console.log(TAG, '2nd try - invoke successfully:', JSON.stringify(result2));
                cb(null, result2);
            });
        } else {

            //console.log(TAG, 'releaseInventory successfully:', result.toString());
            if (debug) console.log(TAG, '1st try - invoke successfully:', JSON.stringify(result));
            cb(null, result);
        }
    });
}

/**
 * Helper function for invoking chaincode using the hfc SDK.
 * @param chain A hfc chain object representing our network.
 * @param enrollID The enrollID for the user we should use to submit the invoke request.
 * @param requestBody A valid hfc invoke request object.
 * @param cb A callback of the form: function(error, invoke_result)
 */
function doInvoke(chain, enrollID, requestBody, cb) {

    // Submit the invoke transaction as the given user
    if (debug) console.log(TAG, 'Invoke transaction as:', enrollID);
    chain.getMember(enrollID, function (getMemberError, usr) {
        if (getMemberError) {
            if (debug) console.error(TAG, 'failed to get ' + enrollID + ' member:', getMemberError.message);
            if (cb) cb(getMemberError);
        } else {
            if (debug) console.log(TAG, 'successfully got member:', enrollID);

            if (debug) console.log(TAG, 'invoke body:', JSON.stringify(requestBody));
            var invokeTx = usr.invoke(requestBody);

            // Print the invoke results
            invokeTx.on('completed', function (results) {
                // Invoke transaction submitted successfully
                if (debug) console.log(TAG, 'Successfully completed invoke. Results:', results);
                cb(null, results);
            });
            invokeTx.on('submitted', function (results) {
                // Invoke transaction submitted successfully
                if (debug) console.log(TAG, 'invoke submitted');
                cb(null, results);
            });
            invokeTx.on('error', function (err) {
                // Invoke transaction submission failed
                console.log(TAG, 'invoke failed. Error:', err);
                cb(err);
            });
        }
    });
}

/**
 * Helper function for querying chaincode using the hfc SDK.
 * @param chain A hfc chain object representing our network.
 * @param enrollID The enrollID for the user we should use to submit the query request.
 * @param requestBody A valid hfc query request object.
 * @param cb A callback of the form: function(error, queried_data)
 */
function query(chain, enrollID, requestBody, cb) {
    doQuery(chain, enrollID, requestBody, function (err, qResponse) {
        if (err) {
            console.error(TAG, '1st try - failed to get query data:', err);
            doQuery(chain, enrollID, requestBody, function (err2, qResponse2) {
                if (err2) {
                    console.error(TAG, '2nd try - failed to get query data:', err2);
                    return cb(err2);
                }

                if (debug) console.log(TAG, '2nd try - retrieved query data:', qResponse2.toString());
                cb(null, qResponse2.toString());
            });
        } else {

            if (debug) console.log(TAG, '1st try - retrieved query data:', qResponse.toString());
            cb(null, qResponse.toString());
        }
    });
}

/**
 * Helper function for querying chaincode using the hfc SDK.
 * @param chain A hfc chain object representing our network.
 * @param enrollID The enrollID for the user we should use to submit the query request.
 * @param requestBody A valid hfc query request object.
 * @param cb A callback of the form: function(error, queried_data)
 */
function doQuery(chain, enrollID, requestBody, cb) {
    // Submit the invoke transaction as the given user
    if (debug) console.log(TAG, 'querying chaincode as:', enrollID);
    chain.getMember(enrollID, function (getMemberError, usr) {
        if (getMemberError) {
            console.error(TAG, 'failed to get ' + enrollID + ' member:', getMemberError.message);
            if (cb) cb(getMemberError);
        } else {
            if (debug) console.log(TAG, 'successfully got member:', enrollID);

            if (debug) console.log(TAG, 'query body:', JSON.stringify(requestBody));
            var queryTx = usr.query(requestBody);

            queryTx.on('complete', function (results) {
                if (debug) console.log(TAG, 'Successfully completed query. Results:', results);
                cb(null, results.result);
            });
            queryTx.on('error', function (err) {
                console.log(TAG, 'query failed. Error:', err);
                cb(err);
            });
        }
    });
}