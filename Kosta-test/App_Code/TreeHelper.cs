using Kosta_test.Models;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Kosta_test.App_Code
{
    public static class TreeHelper
    {
		//Формирование html-кода структуры предприятия в виде дерева
		public static HtmlString CreateTree(this IHtmlHelper html, IEnumerable<Department> departments)
        {
            var treeDepartments = departments.Select(
                i => new TreeViewNode { ID = i.ID.ToString(), Parent = i.ParentDepartmentID.ToString(), Name = i.Name }
                ).ToList();

            foreach (var department in treeDepartments )
            {
                department.Children = treeDepartments.Where(x => x.Parent == department.ID).ToList();
            }

            var rootDepartments = treeDepartments.Where(x => x.Parent == "").ToList();

            var result = "<ul>";
            if(rootDepartments.Count > 0)
            {
                foreach(var item in rootDepartments)
                {
                    result = $"{result}{GetStructure(item)}";
                }
            }
            result = $"{result}</ul>";
            return new HtmlString(result);
        }


        //Вспомогательная рекурсивная функция для формирования вложенности
        private static string GetStructure(TreeViewNode node)
        {
            var result = $"<li>{node.Name} </li>" +
                $"<form method=\"post\">" +
                    $"<input type=\"submit\" value=\"Сотрудники\" formaction=\"/Home/ShowEmployees\"/>" +
                    $"<input type=\"hidden\" name=\"depID\" value=\"{node.ID}\"/>" +
                $"</form>" +
                $"<br>";
            if (node.Children.Count == 0)
            {                
                return result;
            }

            result = $"{result}<ul>";
            foreach(var item in node.Children)
            {
                result = $"{result}{GetStructure(item)}";
            }
            result = $"{result}</ul>";

            return result;
        }
    }
}