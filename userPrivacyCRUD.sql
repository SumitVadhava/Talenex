select * from UserPrivacy

select * from Users


INSERT INTO UserPrivacy (
    Id,
    UserId,
    IsProfilePublic,
    ShowLocation,
    ShowSkills,
    AllowMessagesFrom
)
VALUES (
    NEWID(),
    'FBC11675-7478-4963-AF99-DE8E3FE03971', -- existing Users.Id
    1,
    0,
    1,
    'friends'
);

INSERT INTO UserPrivacy (
    Id,
    UserId,
    IsProfilePublic,
    ShowLocation,
    ShowSkills,
    AllowMessagesFrom
)
VALUES (
    NEWID(),
    '0B862342-492A-41FC-AFAA-BA428CA83EA6', -- another existing Users.Id
    1,
    0,
    1,
    'everyone'
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
    'clerk_test_user_12345',
    'testuser12345@talenex.com',
    'Test',
    'User',
    'https://cdn.example.com/avatar.png',
    GETDATE(),
    GETDATE()
);

SELECT @UserId AS UserId;
