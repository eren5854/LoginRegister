using ED.Result;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace LoginRegisterServer.Application.Features.Auth.Register;
public sealed record RegisterCommand(
    string FirstName,
    string LastName,
    string UserName,
    DateOnly? DateOfBirth,
    IFormFile? ProfilePicture,
    string Email,
    string Password,
    string PhoneNumber) : IRequest<Result<string>>;
