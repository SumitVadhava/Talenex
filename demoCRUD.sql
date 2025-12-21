select * from  Users

select * from UserNotificationPreferences

select * from UserAvailabilities

--DECLARE @UserId UNIQUEIDENTIFIER = NEWID();

INSERT INTO Users (
    Id,
    ClerkUserId,
    Email,
    FirstName,
    LastName,
    ImageUrl,
    CreatedAt,
    LastLoginAt
)
VALUES (
    @UserId,
    CONCAT('clerk_test_', LEFT(CONVERT(varchar(36), NEWID()), 8)),
    CONCAT('user', LEFT(CONVERT(varchar(36), NEWID()), 5), '@talenex.com'),
    'Meet',
    'Parmar',
    'https://cdn.example.com/avatar.png',
    GETDATE(),
    GETDATE()
);

SELECT @UserId AS NewUserId;


INSERT INTO UserAvailabilities(
    Id,
    UserId,
    AvailableOnWeekdays,
    AvailableOnWeekends,
    PreferredSessionDuration,
    PreferredSessionMode
)
VALUES (
    NEWID(),
    '0B862342-492A-41FC-AFAA-BA428CA83EA6', -- existing Users.Id
    1,
    1,
    120,
    'online'
);

DECLARE @UserId UNIQUEIDENTIFIER = NEWID();

INSERT INTO Users (
    Id,
    ClerkUserId,
    Email,
    FirstName,
    LastName,
    ImageUrl,
    CreatedAt,
    LastLoginAt
)
VALUES (
    @UserId,
    'clerk_test_user',
    'testuser@talenex.com',
    'prit',
    'kanani',
    'https://cdn.example.com/avatar.png',
    GETDATE(),
    GETDATE()
);

SELECT @UserId AS UserId;
