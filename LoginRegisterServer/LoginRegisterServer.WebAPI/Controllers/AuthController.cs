using LoginRegisterServer.Application.Features.Auth.ChangePassword;
using LoginRegisterServer.Application.Features.Auth.ChangePasswordUsingToken;
using LoginRegisterServer.Application.Features.Auth.ConfirmEmail;
using LoginRegisterServer.Application.Features.Auth.ForgotPassword;
using LoginRegisterServer.Application.Features.Auth.Login;
using LoginRegisterServer.Application.Features.Auth.Register;
using LoginRegisterServer.Application.Features.Auth.SendConfirmEmal;
using LoginRegisterServer.WebAPI.Abstraction;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LoginRegisterServer.WebAPI.Controllers;

//[AllowAnonymous]
public sealed class AuthController : ApiController
{
    public AuthController(IMediator mediator) : base(mediator)
    {
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPost]
    public async Task<IActionResult> Register(RegisterCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPost]
    public async Task<IActionResult> ConfirmEmail(ConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return StatusCode(response.StatusCode, response);
    }

    [HttpPost]
    public async Task<IActionResult> SendConfirmEmail(SendConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return StatusCode(result.StatusCode, result);
    }

    [Authorize(AuthenticationSchemes = "Bearer")]
    [HttpPost]
    public async Task<IActionResult> ChangePassword(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPost]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPost]
    public async Task<IActionResult> ChangePasswordUsingToken(ChangePasswordUsingTokenCommand request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return StatusCode(result.StatusCode, result);
    }
}
