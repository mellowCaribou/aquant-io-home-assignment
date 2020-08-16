function invoke(functionName, callback, ...args){
    if(!window.Visualforce){
        console.info(`Salesforce remoteAction:${functionName} not called.`);
        return;
    }

    window.Visualforce.remoting.Manager.invokeAction(`MapsController.${functionName}`, ...args, callback);

}

export default {invoke};