using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/Item")]
    public class ItemController : Controller
    {
        private readonly MakersPortalRepository makersPortalRepository;

        public ItemController()
        {
            makersPortalRepository = new MakersPortalRepository();
        }

        [HttpPost]
        [Route("AddItem")]
        public void Post([FromBody]Items item)
        {           
            makersPortalRepository.AddItem(item);
        }

        [HttpGet("{Id}")]
        public Items Get(int id)
        {
            return makersPortalRepository.GetItemById(id);
        }

        [HttpGet]
        [Route("GetItems")]
        public IEnumerable<Items> Get()
        {
            return makersPortalRepository.GetAllItem();
        }

        [HttpPut("{id}")]
        [Route("UpdateItem")]
        public void PostItem([FromBody]Items item)
        {
            makersPortalRepository.UpdateItem(item);
        }
        [HttpDelete("{id}")]
        [Route("DeleteItem/{id}")]
        public void Delete(int id)
        {
            makersPortalRepository.DeleteItem(id);
        }
    }
}