using Kosta_test.Models;
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
            if (string.IsNullOrEmpty(depID))
            {
                return BadRequest("Incorrect request");
            }
            
            Guid departmentID;
            if (!Guid.TryParse(depID, out departmentID))
            {
                return BadRequest("Incorrect request");
            }
            
            var employees = db.Employee.Where(item => item.DepartmentID == departmentID).ToList();
            var department = db.Department.Where(x => x.ID == departmentID).FirstOrDefault();
            
            if (department == null)
            {
                return BadRequest("Incorrect request");
            }
            
            ViewData["Department"] = $"{department.Name} ({department.Code})";
            ViewData["DepartmentID"] = department.ID.ToString();
            return View("Employee/EmployeesList", employees);
        }
        
        public IActionResult CreateEmployee(string depID, string empID)
        {
            ViewData["DepartmentList"] = db.Department.ToList();
            return View("Employee/Create");
        }
    }
}
