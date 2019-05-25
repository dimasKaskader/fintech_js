function first(callback) {
    setTimeout(callback, 1000);
}

function second(callback) {
    setTimeout(_ => {
        // Пример. Здесь можент быть логика метода.
    callback();
    });
}

function mainFunction() {console.log('main run')}

function parallelComputing(funcArray, mainFunction) {
    var activeFunctions = funcArray.length
    for(var func of funcArray) {
        func(() => { 
            activeFunctions--
            if (activeFunctions === 0)
                mainFunction();
        })
    }
    
}

parallelComputing([first, second], mainFunction)