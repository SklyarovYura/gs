module.exports = function(gen,...args){

    let itr = gen.apply(undefined,args);

    return new Promise(function(resolve,reject){

    function next(res){
        let resItr;

        try{
            resItr = itr.next(res);
        }catch(err){
            reject(err);
        }

        if( (resItr.value) instanceof Promise){
            resItr.value.then(function(res){
                next(res);
            },function(err){
                reject(err);
            });
        }else
            resolve(resItr.value);

    }

    next();
    });
};