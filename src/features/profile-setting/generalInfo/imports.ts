import { useEffect, useState } from 'react'
import * as React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import * as yup from 'yup'

import styles from './GeneralInfo.module.scss'

import { AutocompletionOfCities } from '@/features/profile-setting/generalInfo/autocompletion-of-cities/AutocompletionOfCities'
import { ProfilePhoto } from '@/features/profile-setting/ui/profilePhoto/ProfilePhoto'
import { useGetProfileQuery, useUpdateProfileMutation, useMeQuery } from '@/shared/api'
import {
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
} from '@/shared/api/services/profile/profile.api'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import { PROFILE_PATH } from '@/shared/constants/paths'
import { fieldGeneralInfo, GeneralInfoFields } from '@/shared/types/profileSettingTypes'
import { Button } from '@/shared/ui/button/Button'
import { Input, InputType } from '@/shared/ui/input/Input'
import { LinearLoader } from '@/shared/ui/loaders/LinearLoader'
import { errorHandler } from '@/shared/utils/errorHandler'
import { Calendar } from '@/widgets/calendar/ui/Calendar'

export {
  useEffect,
  useState,
  React,
  yupResolver,
  useRouter,
  useTranslation,
  Controller,
  useForm,
  Toaster,
  yup,
  styles,
  AutocompletionOfCities,
  ProfilePhoto,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useMeQuery,
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
  Button,
  Input,
  InputType,
  LinearLoader,
  errorHandler,
  Calendar,
  PROFILE_PATH,
}
export type {
  SerializedError,
  FetchBaseQueryError,
  FieldErrors,
  ProfileUserType,
  fieldGeneralInfo,
  GeneralInfoFields,
}
