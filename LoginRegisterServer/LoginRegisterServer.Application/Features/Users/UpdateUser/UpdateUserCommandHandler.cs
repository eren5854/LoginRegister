using AutoMapper;
using ED.GenericRepository;
using ED.Result;
using GenericFileService.Files;
using LoginRegisterServer.Domain.Entities;
using MediatR;

namespace LoginRegisterServer.Application.Features.Users.UpdateUser;
internal sealed class UpdateUserCommandHandler(
    IAppUserRepository appUserRepository,
    IMapper mapper,
    IUnitOfWork unitOfWork) : IRequestHandler<UpdateUserCommand, Result<string>>
{
    public async Task<Result<string>> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        AppUser? user = await appUserRepository.GetByExpressionAsync(p => p.Id == request.Id);
        if (user is null)
        {
            return Result<string>.Failure("User not found");
        }

        if (user.UserName == request.UserName)
        {
            string profilePicture = "";
            //var response = request.ProfilePicture;
            if (request.ProfilePicture is null)
            {
                profilePicture = user.ProfilePicture;
            }
            else
            {
                profilePicture = FileService.FileSaveToServer(request.ProfilePicture, "wwwroot/ProfilePictures/");
            }

            mapper.Map(request, user);
            user.ProfilePicture = profilePicture;
            user.UpdatedBy = request.UserName;
            user.UpdatedDate = DateTime.Now;

            appUserRepository.Update(user);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Update is successful");
        }

        var isUserNameExists = await appUserRepository.AnyAsync(p => p.UserName == request.UserName);
        if (!isUserNameExists)
        {
            string profilePicture = "";
            var response = request.ProfilePicture;
            if (response is null)
            {
                profilePicture = user.ProfilePicture;
            }
            else
            {
                profilePicture = FileService.FileSaveToServer(request.ProfilePicture, "wwwroot/ProfilePictures/");
            }

            mapper.Map(request, user);
            user.ProfilePicture = profilePicture;
            user.UpdatedBy = request.UserName;
            user.UpdatedDate = DateTime.Now;

            appUserRepository.Update(user);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<string>.Succeed("Update is successful");
        }
        return Result<string>.Failure("User name already exists");
    }

}
