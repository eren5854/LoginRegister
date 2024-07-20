using ED.Result;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace LoginRegisterServer.Application.Features.Users.UpdateUser;
public sealed record UpdateUserCommand(
    Guid Id,
    string FirstName,
    string LastName,
    string UserName,
    DateOnly? DateOfBirth,
    IFormFile? ProfilePicture,
    string PhoneNumber): IRequest<Result<string>>;
