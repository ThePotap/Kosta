using Kosta_test.Models;

namespace Kosta_test.ViewModels
{
	public class DepartmentCardModel
	{
		public IEnumerable<Department> Departments { get; set; }
		public Department Department{ get; set; }
	}
}
