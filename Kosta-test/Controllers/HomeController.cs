using Kosta_test.Models;
using Kosta_test.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Kosta_test.Controllers
{
    public class HomeController : Controller
    {
        ApplicationContext db;
        public HomeController(ApplicationContext context)
        {
            db = context;
        }

        public IActionResult Index()
        {
            return View(db.Department.ToList());
        }

        [HttpPost]
        public IActionResult ShowEmployees(string depID)
        {
			if (!DepartmentIDCorrect(depID))
			{
				return BadRequest("Incorrect request");
			}

            var departmentID = Guid.Parse(depID);
			var employees = db.Employee.Where(item => item.DepartmentID == departmentID).ToList();
            var department = db.Department.Where(item => item.ID == departmentID).FirstOrDefault();
            
            ViewData["Department"] = $"{department.Name} ({department.Code})";
            ViewData["DepartmentID"] = department.ID.ToString();
            return View("Employee/EmployeesList", employees);
        }
        
        public IActionResult CreateEmployee(string depID)
        {
            ViewData["DepartmentID"] = depID;
            var departments = db.Department.ToList();
            var employee = new Employee();
            var employeeCardModel = new EmployeeCardModel
            {
                Departments = departments,
                Employee = employee
            };
            return View("Employee/Create", employeeCardModel);
        }

        public IActionResult SaveNewEmployee(string selectedDepID, Employee employee)
        {
            if (!DepartmentIDCorrect(selectedDepID))
            {
				return BadRequest("Incorrect request");
			}

			employee.DepartmentID = Guid.Parse(selectedDepID);
			db.Employee.Add(employee);
            db.SaveChanges();

			return ShowEmployees(selectedDepID);
		}

        private bool DepartmentIDCorrect(string depID)
        {
			if (string.IsNullOrEmpty(depID))
			{
                return false;
			}

			Guid departmentID;
			if (!Guid.TryParse(depID, out departmentID))
			{
				return false;
			}

			var department = db.Department.Where(item => item.ID == departmentID).FirstOrDefault();
			if (department == null)
			{
				return false;
			}

			return true;
		}

        private bool EmployeeIDCorrect(string empID)
        {
			if (string.IsNullOrEmpty(empID))
			{
				return false;
			}

            decimal employeeID;
            if(!decimal.TryParse(empID, out employeeID))
            {
                return false;
            }

            var employee = db.Employee.Where(item => item.ID == employeeID).FirstOrDefault();
            if (employee == null)
            {
                return false;
            }

            return true;
		}
    }
}
