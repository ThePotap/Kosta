using Kosta_test.Models;

namespace Kosta_test.ViewModels
{
	public class EmployeeCardModel
	{
		public IEnumerable<Department> Departments { get; set; }
		public Employee Employee { get; set;}
	}
}
