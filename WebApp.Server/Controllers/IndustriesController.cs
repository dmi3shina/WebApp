using Microsoft.AspNetCore.Mvc;
using WebApp.Server.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class IndustriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public IndustriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: <IndustriesController>
        [HttpGet]
        public IEnumerable<Industry> Get()
        {
            return _context.Industies;
        }
    }
}
