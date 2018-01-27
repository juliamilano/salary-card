DESCRIPTION:


Create 3 Classes which describe Employee. 
One Abstract Class and two concrete implementations:
  
* First implementation - Employee with fixed salary. Where average monthly salary = employee salary.
  
* Second implementation - Employee with per-hour salary. Where average monthly salary = 20.8 8 employee salary.




REQUIREMENTS:


1. In Abstract Employee Class describe an abstract method which calculates Employee average monthly salary
  according to rules described above(method:getSalary).

2. Create Class which represents collection of Employees:
  
- Collection of Employees must be sorted by the next rules:
 Sort all workers in descending order of average monthly salary.
 If average monthly salary of Employees is equal use Employee name instead.
  
- Ability to get id, name, average monthly salary for each Employee in collection. 
	Output example:
     
	[
       
		{
			id: employeeId, 
			name: employeeName, 
			salary: employee average monthly salary
		},
 
		{
			id: employeeId, 
			name: employeeName, 
			salary: employee average monthly salary
		}
     
	]
  
- Ability to get five first employee names from collection.
     
	Output example:
       
	['Jo', 'Bob', 'Alice', 'Robb', 'Jenny']
  
- Ability to get last three employee ids from collection.
     
	Output example:
       
	['id5', 'id4', 'id3']


3. Organize ability to get Employees Data from different sources (AJAX, Textarea on the page).
    
Note here:
    Using the same Collection Class we want to have an ability to get data from Back End in one place but in another place
 we want to get data from text area on the page(Lets imagine that it's a kind of admin tool).


4. Implement html page to retrieve Employees Data (see previous item).


5. Protect your classes from incorrect input. Meaningful error handling.



**** Additional notes ****
  
You can use lodash/underscore libs.
  jQuery for DOM manipulations/AJAX if needed.
  If you want to use Async Flow Control use Q, jQuery.Deferred(). Q is preferable.
  MVC frameworks are prohibited here.



**** Optional ****
  
Use AMD(Require.js for example).
  Unit tests(Any framework).




WORKFLOW:

Upload your solution to git in folder "students/<first_last-name>/<name of topic>/task-1"

Project structure:|
 - css
 - js
   index.html



SOURCES:

Use employees source file employeesCollection.json to make initial collection state.




DEADLINE:

Due Date - 3 days from the moment of the presentation (08.04.2016 23:59)
Penalty - minus 1 score for each overdue day
