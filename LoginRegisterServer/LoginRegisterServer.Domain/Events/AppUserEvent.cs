using MediatR;

namespace LoginRegisterServer.Domain.Events;
public sealed class AppUserEvent : INotification
{
    public Guid UserId { get; private set; }
    public AppUserEvent(Guid userId)
    {
        UserId = userId;
    }
}
