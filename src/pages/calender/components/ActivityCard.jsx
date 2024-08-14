import { Flex, Text, Box, Tooltip } from '@chakra-ui/react'
// import { format, parseISO } from 'date-fns'
import { BsTrashFill, BsFillStarFill } from 'react-icons/bs'
import { MdEdit, MdRemoveRedEye } from 'react-icons/md'
import CautionAlertDialog from '../../../components/CautionDialog'
import CustomModal from '../../../components/CustomModal'
import EditActivityForm from './EditActivityForm'
import { useSelector } from 'react-redux'
import { ActivityInformation } from './ActivityInformation'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const ActivityCard = ({ staffId, companyCode, refresh, activity }) => {
  const getBrandColor = useSelector((state) => state.auth?.brandColor)

  return (
    <Flex
      bg='#F9F9F9'
      minWidth='15rem'
      p={4}
      borderRadius='10px'
      justify='space-between'
      mb={2}
    >
      <Flex direction='column'>
        <Box color='secondary' mb={2}>
          <BsFillStarFill color='#EF9400' size='1.5rem' />
        </Box>
        <Tooltip
          label={`${activity?.patientId?.firstName} ${activity?.patientId?.lastName}`}
        >
          <Link
            to={{
              pathname: '/chats',
              state: { user: activity?.patientId },
            }}
          >
            <Text
              as='h4'
              fontWeight='bold'
              color={getBrandColor}
              maxWidth='80px'
              isTruncated
            >
              {activity?.patientId?.firstName} {activity?.patientId?.lastName}
            </Text>
          </Link>
        </Tooltip>
        <Text as='h6' fontWeight='bold' fontSize='.7rem' color='gray'>
          {/* // format(parseISO(activity?.startDate), 'hh:mm a')  */}
          {dayjs(activity?.startDate).format('hh:mm a')}
        </Text>
      </Flex>

      <Flex
        direction='row'
        sx={{
          '&': {
            svg: {
              background: '#E6F0FF',
              padding: '.3rem',
              fill: '#757575',
            },
          },
        }}
        justify='space-between'
        alignItems='start'
        gridGap={2}
      >
        {/* //ggg */}
        <CustomModal
          btnIcon={<MdRemoveRedEye size='1.3rem' />}
          buttonProps={{
            p: 0,
            h: 'auto',
            minW: 'auto',
          }}
          title='Activity Information'
        >
          <ActivityInformation activity={activity} />
        </CustomModal>

        <CustomModal
          btnTitle={<MdEdit size='1.3rem' />}
          buttonProps={{
            p: 0,
            h: 'auto',
            minW: 'auto',
          }}
          title='Update Activity'
        >
          <EditActivityForm
            staffId={staffId}
            companyCode={companyCode}
            title={activity?.title}
            date={activity?.date?.split('.')[0]}
            description={activity?.description}
            activityId={activity?._id}
            refresh={refresh}
          />
        </CustomModal>

        <CautionAlertDialog
          buttonProps={{
            // isLoading: deleteLoading,
            p: 0,
            h: 'auto',
            minW: 'auto',
          }}
          button={<BsTrashFill size='1.3rem' />}
          cautionTitle='Are you sure you want to cancel this visit?'
          // onContinue={() => handleDelete()}
        />
      </Flex>
    </Flex>
  )
}

export default ActivityCard
