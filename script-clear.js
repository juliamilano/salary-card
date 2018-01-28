 // пустой массив для данных get json
var dataArrJson = [];

function loadJSON(path, success, error){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                if (success){
                    success(JSON.parse(xhr.responseText));                    
                }                   
            }else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function postJSON(data, path, success, error){
    // формируем объект formdata для передачи в php file данных ключ название для $_POST["ключ"] => значение [{}, {}, {}] 
    var formData = new FormData();
    formData.append( 'jsonStr', JSON.stringify(data)); // (ключ, значение )

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){            
            if (xhr.status === 200){
                if (success){}                   
            }else{
                if (error){
                    error(xhr);
                }                    
            }
        }
    };
    xhr.open("POST", path, true);
  
// formdata
    xhr.send(formData);

}



function sendDatatoJSON(dataArrJson){
    
    postJSON(dataArrJson, './form.php',
    function(data) {
       // data.push(dataArrJson);
        console.log(data);
       },
    function(xhr) { console.error(xhr); });
}

/**
 * @constructor создает чек-карточку для нового сотрудника, считает зп
 * @param {div, id, name, salaryType, valueSalary} div обертка элемент для создающихся в конструкторе элементов, аргуметны такие как ключи в главном массиве с данными
 * @return {obj HTMLElement} createElement - self.div
 */

function EmployFactory(div, id, name, salaryType, valueSalary) {
    

    newDiv = document.createElement("div");
    newDiv.className = 'check';
    this.id = id || 1111;
    this.div = newDiv;
    this.name = name|| "Вася"; 
    this.salaryType = salaryType.toLowerCase() || "fixedsalaryemployee"; 
    this.valueSalary = +valueSalary || 5000; 

    var hours = 8;
    var days = 21;

    var result = 200;
    var self = this;

    function countSalary(){
        if(self.salaryType == "hourlysalaryemployee"){
            var result = hours * days * +self.valueSalary;
        }else{
            var result = +self.valueSalary;
        }
        return result;
    }

    this.getValSalary = function(){
       return countSalary();        
    };    
    
    /**
     * создаем объект для пуша в главный массив данных
     */
    var obj = {};
    obj.type = this.salaryType;
    obj.salary = this.getValSalary();
    obj.name =  this.name;
    obj.id = this.id;
// пушим новые данные в объекте в массив 
    dataArrJson.push(obj);

// выводим в элементах
    var idCheck = document.createElement("p");
        idCheck.className = "idcheck";
    var textId = document.createTextNode("id:" + self.id);
        idCheck.appendChild(textId);
     self.div.appendChild(idCheck);
        
    var nameCheck = document.createElement("p");
        nameCheck.className = "namecheck";
    var textName = document.createTextNode(self.name);
        nameCheck.appendChild(textName);
    self.div.appendChild(nameCheck);

    var typeSalaryCheck = document.createElement("p");
        typeSalaryCheck.className = "typeSalarycheck";
    var textTypeSalary = document.createTextNode(salaryType);
        typeSalaryCheck.appendChild(textTypeSalary);
    self.div.appendChild(typeSalaryCheck);
        
    var valueSalaryCheck = document.createElement("p");
        valueSalaryCheck.className = "valueSalarycheck";
    var textValueSalary = document.createTextNode("За месяц: " + self.getValSalary() + " грн");
        valueSalaryCheck.appendChild(textValueSalary);
// помещаем в все в главный общий див
    self.div.appendChild(valueSalaryCheck);
//возвращаем див 
    return self.div;
}




/**
 * 
 * @param {array} массив с данными;
 */
function countTotal(arr){
    var total = document.getElementById("total");
    var cnt = 0;
    arr.forEach(function (element, index, array) {
        cnt += element['salary'];
    });
    total.innerHTML = cnt;
}

/**
 * 
 * @param {int} число, число ;
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


// var div;
// var employ = new EmployFactory(div, 11, "Fao", "HourlySalaryEmployee", 50);

// console.log(employ.getValSalary());

window.onload = function(){
     /**
     * все поля для ввода
     */
    var inpNameEmploier = document.getElementById("name");
    var selectTypesalary = document.getElementById("selectSalary");
    var inpValueSalary = document.getElementById("valueSalary");
    var addButton = document.getElementById("addButton");

    //див - вывод для array с полученными данными
    var wrapCheck = document.getElementById("wrap-check");
    
    /**
     * введенные значения в поля
     */
    var inpValueSalaryVal;
    var inpValueName;
    var valueSelect = selectTypesalary.options[selectTypesalary.selectedIndex].value;
    /**
     * события для инпутов
     */
    // select
    selectTypesalary.addEventListener("change", function (e){
        valueSelect = selectTypesalary.options[selectTypesalary.selectedIndex].value;
    });

    // name сотрудника
    inpNameEmploier.addEventListener("change", function (e){
        inpValueName = inpNameEmploier.value;
    });

    //значение з/п
    inpValueSalary.addEventListener("change", function (e){
        inpValueSalaryVal = inpValueSalary.value;
        console.log(inpValueSalaryVal)
    });
  // обработчик на кнопку аdd
    addButton.addEventListener("click", function (e){
        // отмена дейтвия кнопки по умолчанию
        e.preventDefault();
        // создаем рандомный айди
        var idRandom = getRandomInt(5, 50);
        // переменная a, должна быть!!!! чтобы что-то передать. должен быть див, но он генерируется с классом на него автоматом в конструкторе, переменная a должна быть , или любой первый аргумент
        //var a;
        var employAdd = new EmployFactory(1, idRandom, inpValueName, valueSelect, inpValueSalaryVal);
        wrapCheck.appendChild(employAdd);
       
        /**
         * @param {array} массив готорый получили с сервера и в который добавили новое значение;
         * */
      //отправляем на сервер
        sendDatatoJSON(dataArrJson);
        
        /**
         * @param {array} массив с salaryValue для подсчета итого;
         * */
        // считаем итого
        countTotal(dataArrJson);
    });



    /**
     * pfuhe;ftv lfyyst в
     * @param {string, function(obj), function(obj)} {path, succes, error} передираем массив json с базой сотрудников 
     */
    loadJSON('employeesCollection.json', function(data) {             
        dataArrJson = data;
        dataView(dataArrJson);
        countTotal(dataArrJson);
    },
        function(xhr) { 
             console.error(xhr); 
        }
    );

    function dataView(data){
        data.forEach(function (element, index, array) {

            /**
             * создаем новый див , будет в секции 
             */
            var div = document.createElement("div");
            div.className = "check";
            
            var idCheck = document.createElement("p");
            idCheck.className = "idcheck";
            var textId = document.createTextNode(element['id']);
            idCheck.appendChild(textId);
            div.appendChild(idCheck);
            
            var nameCheck = document.createElement("p");
            nameCheck.className = "namecheck";
            var textName = document.createTextNode(element['name']);
            nameCheck.appendChild(textName);
            div.appendChild(nameCheck);

            var typeSalaryCheck = document.createElement("p");
            typeSalaryCheck.className = "typeSalarycheck";
            var textTypeSalary = document.createTextNode(element['type']);
            typeSalaryCheck.appendChild(textTypeSalary);
            div.appendChild(typeSalaryCheck);
            
            var valueSalaryCheck = document.createElement("p");
            valueSalaryCheck.className = "valueSalarycheck";
            var textValueSalary = document.createTextNode("За месяц: " +  element['salary'] + " грн ");
            valueSalaryCheck.appendChild(textValueSalary);

            div.appendChild(valueSalaryCheck);
            wrapCheck.appendChild(div);
        });

        //end viewData
    };
    
   // end window.onload
}


