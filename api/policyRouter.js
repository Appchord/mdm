var policy = (function () {


    var module = function (db,router) {
        var policyModule = require('modules/policy.js').policy;
        var policy = new policyModule(db);

        router.get('policies/{policyid}/enforce', function(ctx){
            policy.enforcePolicy(ctx);
        });
        router.post('policies/', function(ctx){

            log.info("check policy router POST");
            log.info(ctx);
            var result = policy.addPolicy(ctx);
            response.status = result;

        });
        router.put('policies/', function(ctx){

            log.info("check policy router PUT");
            log.info(ctx);
            var result = policy.updatePolicy(ctx);
            if(result == 1){
                response.status = 200;
            }else{
                response.status = 404;
            }

        });
        router.delete('policies/{policyid}', function(ctx){
            log.info("Check Delete Router");
            var result = policy.deletePolicy(ctx);
            if(result==1){
                response.status = 200;
            }else{
                response.status = 404;
            }
        });
        router.get('policies/', function(ctx){

            log.info("check policy router GET");
            log.info(ctx);
            var result = policy.getAllPolicies(ctx);
            if(result != undefined && result != null && result[0] != undefined && result[0]!= null){
                print(result);
                response.status = 200;
            }else{
                response.status = 404;
            }

        });
        router.get('policies/{policyid}', function(ctx){

            var result = policy.getPolicy(ctx);

            if(result != undefined && result != null){
                log.info("Content "+stringify(result));
                print(result);
                response.status = 200;
            }else{
                response.status = 404;
            }

        });
        router.put('policies/{policyid}/groups', function(ctx){
            log.info("check policy router PUT");
            log.info(ctx);
            policy.assignGroupsToPolicy(ctx);


        });
        router.put('policies/{policyid}/users', function(ctx){
            log.info("check policy router PUT");
            log.info(ctx);
            policy.assignUsersToPolicy(ctx);


        });
        router.put('policies/{policyid}/platforms', function(ctx){
            log.info("check policy router PUT");
            log.info(ctx);
            policy.assignPlatformsToPolicy(ctx);


        });
        router.get('policies/{policyid}/groups', function(ctx){

            var result = policy.getGroupsByPolicy(ctx);

        });

    };
    // prototype
    module.prototype = {
        constructor: module
    };
    // return module
    return module;
})();