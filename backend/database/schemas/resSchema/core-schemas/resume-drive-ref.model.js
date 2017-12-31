var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var resume = require('./resume-core.model');

// todo change labels and design fields from arrays to just being a single ObjectId reference (see user.model field core_resume)
//var ResumeSchema =
module.exports = resume.discriminator('DriveRefResume', new Schema({
        "kind": {type: String},
        "id": {type: String},
        "name": {type: String},
        "mimeType": {type: String},
        "description": {type: String},
        "starred": {type: Boolean},
        "trashed": {type: Boolean},
        "explicitlyTrashed": {type: Boolean},
        "trashingUser": {
            "kind": {type: String},
            "displayName": {type: String},
            "photoLink": {type: String},
            "me": {type: Boolean},
            "permissionId": {type: String},
            "emailAddress": {type: String}
        },
        "trashedTime": {type: Date},
        "parents": [
            {type: String}
        ],
        "properties": {
            "keys": {type: String}
        },
        "appProperties": {
            "keys": {type: String}
        },
        "spaces": [
            {type: String}
        ],
        "version": {type: Number},
        "webContentLink": {type: String},
        "webViewLink": {type: String},
        "iconLink": {type: String},
        "hasThumbnail": {type: Boolean},
        "thumbnailLink": {type: String},
        "thumbnailVersion": {type: Number},
        "viewedByMe": {type: Boolean},
        "viewedByMeTime": {type: Date},
        "createdTime": {type: Date},
        "modifiedTime": {type: Date},
        "modifiedByMeTime": {type: Date},
        "modifiedByMe": {type: Boolean},
        "sharedWithMeTime": {type: Date},
        "sharingUser": {
            "kind": {type: String},
            "displayName": {type: String},
            "photoLink": {type: String},
            "me": {type: Boolean},
            "permissionId": {type: String},
            "emailAddress": {type: String}
        },
        "owners": [
            {
                "kind": {type: String},
                "displayName": {type: String},
                "photoLink": {type: String},
                "me": {type: Boolean},
                "permissionId": {type: String},
                "emailAddress": {type: String}
            }
        ],
        "teamDriveId": {type: String},
        "lastModifyingUser": {
            "kind": {type: String},
            "displayName": {type: String},
            "photoLink": {type: String},
            "me": {type: Boolean},
            "permissionId": {type: String},
            "emailAddress": {type: String}
        },
        "shared": {type: Boolean},
        "ownedByMe": {type: Boolean},
        "capabilities": {
            "canAddChildren": {type: Boolean},
            "canChangeViewersCanCopyContent": {type: Boolean},
            "canComment": {type: Boolean},
            "canCopy": {type: Boolean},
            "canDelete": {type: Boolean},
            "canDownload": {type: Boolean},
            "canEdit": {type: Boolean},
            "canListChildren": {type: Boolean},
            "canMoveItemIntoTeamDrive": {type: Boolean},
            "canMoveTeamDriveItem": {type: Boolean},
            "canReadRevisions": {type: Boolean},
            "canReadTeamDrive": {type: Boolean},
            "canRemoveChildren": {type: Boolean},
            "canRename": {type: Boolean},
            "canShare": {type: Boolean},
            "canTrash": {type: Boolean},
            "canUntrash": {type: Boolean}
        },
        "viewersCanCopyContent": {type: Boolean},
        "writersCanShare": {type: Boolean},
        "permissions": {
            type: Array, default: [
                {
                    "kind": {type: String},
                    "id": {type: String},
                    "type": {type: String},
                    "emailAddress": {type: String},
                    "domain": {type: String},
                    "role": {type: String},
                    "allowFileDiscovery": {type: Boolean},
                    "displayName": {type: String},
                    "photoLink": {type: String},
                    "expirationTime": {type: Date},
                    "teamDrivePermissionDetails": [
                        {
                            "teamDrivePermissionType": {type: String},
                            "role": {type: String},
                            "inheritedFrom": {type: String},
                            "inherited": {type: Boolean}
                        }
                    ],
                    "deleted": {type: Boolean}
                }
            ]
        },
        "hasAugmentedPermissions": {type: Boolean},
        "folderColorRgb": {type: String},
        "originalFilename": {type: String},
        "fullFileExtension": {type: String},
        "fileExtension": {type: String},
        "md5Checksum": {type: String},
        "size": {type: Number},
        "quotaBytesUsed": {type: Number},
        "headRevisionId": {type: String},
        "contentHints": {
            "thumbnail": {
                "image": {type: Buffer},
                "mimeType": {type: String}
            },
            "indexableText": {type: String}
        },
        "imageMediaMetadata": {
            "width": {type: Number},
            "height": {type: Number},
            "rotation": {type: Number},
            "location": {
                "latitude": {type: Number},
                "longitude": {type: Number},
                "altitude": {type: Number}
            },
            "time": {type: String},
            "cameraMake": {type: String},
            "cameraModel": {type: String},
            "exposureTime": {type: Number},
            "aperture": {type: Number},
            "flashUsed": {type: Boolean},
            "focalLength": {type: Number},
            "isoSpeed": {type: Number},
            "meteringMode": {type: String},
            "sensor": {type: String},
            "exposureMode": {type: String},
            "colorSpace": {type: String},
            "whiteBalance": {type: String},
            "exposureBias": {type: Number},
            "maxApertureValue": {type: Number},
            "subjectDistance": {type: Number},
            "lens": {type: String}
        },
        "videoMediaMetadata": {
            "width": {type: Number},
            "height": {type: Number},
            "durationMillis": {type: Number}
        },
        "isAppAuthorized": {type: Boolean}
    },
    {
        discriminatorKey: '_kind',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
))
;