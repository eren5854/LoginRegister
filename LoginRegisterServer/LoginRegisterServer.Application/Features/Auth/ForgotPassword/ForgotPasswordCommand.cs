using ED.Result;
using MediatR;

namespace LoginRegisterServer.Application.Features.Auth.ForgotPassword;
public sealed record ForgotPasswordCommand(
    string Email): IRequest<Result<string>>;
