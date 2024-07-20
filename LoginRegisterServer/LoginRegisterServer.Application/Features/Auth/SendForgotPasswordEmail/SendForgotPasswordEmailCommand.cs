using ED.Result;
using MediatR;

namespace LoginRegisterServer.Application.Features.Auth.SendForgotPasswordEmail;
public sealed record SendForgotPasswordEmailCommand(
    string Email): IRequest<Result<string>>;
