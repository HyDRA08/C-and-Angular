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
    [Route("api/Order")]
    public class OrderController : Controller
    {
        private readonly MakersPortalRepository makersPortalRepository;

        public OrderController()
        {
            makersPortalRepository = new MakersPortalRepository();
        }

        [HttpPost]
        [Route("AddOrder")]
        public void Post([FromBody]Order order)
        {
            makersPortalRepository.CreateOrder(order);
        }

        //[HttpGet("{Id}")]
        //public Items Get(int id)
        //{
        //    return makersPortalRepository.GetItemById(id);
        //}

        [HttpGet]
        [Route("PaymentModes")]
        public IEnumerable<PaymentMode> GetPayModes()
        {
            return makersPortalRepository.GetPaymentModes();
        }

        [HttpGet("{id}")]
        [Route("GetOrders/{id}")]
        public IEnumerable<Order> Get(int id)
        {
            return makersPortalRepository.GetOrder(id);
        }

        //[HttpGet("{id}")]
        //[Route("GetAllOrders/{id}")]
        //public IEnumerable<Order> GetAllOrders(int id)
        //{
        //    return makersPortalRepository.GetAllOrder(id);
        //}

        [HttpPut("{id}")]
        public void Post(int id, [FromBody]Order order)
        {
            makersPortalRepository.UpdateOrder(order);
        }
        [HttpDelete("{id}")]
        [Route("DeleteOrder/{id}")]
        public void Delete(int id)
        {
            makersPortalRepository.DeleteOrder(id);
        }
    }
}