#!/usr/bin/env bash

REQUIRED_ROOT="/media/sysadmin/projects";
#"cd ${REQUIRED_ROOT}";
CURRENT_DIR=${PWD};




#MY_DEV_UTILS="/media/sysadmin/projects/0My_Dev_Utilities";
MY_DEV_UTILS="$REQUIRED_ROOT/0My_Dev_Utilities";
# /media/sysadmin/projects/0My_Dev_Utilities
echo "${MY_DEV_UTILS}";
if [ -d ${MY_DEV_UTILS} ]
then
echo "directory ${MY_DEV_UTILS} exists";
"cd" ${MY_DEV_UTILS};
MY_DEV_UTILS="$MY_DEV_UTILS/mini_mock_api"
	if [ -d ${MY_DEV_UTILS} ]
	then
	echo "directory ${MY_DEV_UTILS} exists";
	"cd" ${MY_DEV_UTILS};
	MY_DEV_UTILS="$MY_DEV_UTILS/bin";
		if [ -d ${MY_DEV_UTILS} ]
		then
		echo "directory ${MY_DEV_UTILS} exists";
		"cd" ${MY_DEV_UTILS};
		MY_DEV_UTILS="$MY_DEV_UTILS/www";
			if [ -f ${MY_DEV_UTILS} ]
			then
			echo "file ${MY_DEV_UTILS} exists";
			echo "Launching Mini Mock Api at: ${MY_DEV_UTILS}";
			. "$MY_DEV_UTILS";

			else
			exit 11
			fi
		else
		exit 11
		fi
	else
	exit 11
	fi
else
exit 11
fi