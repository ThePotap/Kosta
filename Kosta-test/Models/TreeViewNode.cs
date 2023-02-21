namespace Kosta_test.Models
{
    public class TreeViewNode
    {
        public string ID { get; set; }
        public string? Parent { get; set; }       
        public string Name { get; set; }
        public List<TreeViewNode> Children { get; set;}
    }
}
