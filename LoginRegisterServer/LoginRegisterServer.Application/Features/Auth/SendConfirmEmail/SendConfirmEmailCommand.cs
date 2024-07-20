using ED.Result;
using MediatR;

namespace LoginRegisterServer.Application.Features.Auth.SendConfirmEmal;
public sealed record SendConfirmEmailCommand(
    string Email): IRequest<Result<string>>;
