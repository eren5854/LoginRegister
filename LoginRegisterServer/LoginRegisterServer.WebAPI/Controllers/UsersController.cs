using LoginRegisterServer.Application.Features.Users.GetAllUser;
using LoginRegisterServer.WebAPI.Abstraction;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LoginRegisterServer.WebAPI.Controllers;

public sealed class UsersController : ApiController
{
    public UsersController(IMediator mediator) : base(mediator)
    {
    }
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetAllUserQuery(), cancellationToken);
        return StatusCode(result.StatusCode, result);
    }

}
