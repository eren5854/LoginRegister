using ED.Result;
using MediatR;

namespace LoginRegisterServer.Application.Features.Auth.Register;
public sealed record RegisterCommand(
    string FirstName,
    string LastName,
    string UserName,
    DateOnly? DateOfBirth,
    string? ProfilePicture,
    string Email,
    string Password,
    string PhoneNumber) : IRequest<Result<string>>;
