<?php
/**
 * ApiAddress model class.
 *
 * @copyright YetiForce Sp. z o.o
 * @license YetiForce Public License 3.0 (licenses/LicenseEN.txt or yetiforce.com)
 */

/**
 * Class ApiAddress.
 */
class ApiAddress
{
	/**
	 * Invoked when special actions are performed on the module.
	 *
	 * @param string Module name
	 * @param string Event Type
	 */
	public function moduleHandler($moduleName, $eventType)
	{
		require_once 'include/database/PearDatabase.php';
		require_once 'include/utils/CommonUtils.php';
		require_once 'include/fields/DateTimeField.php';
		require_once 'include/fields/DateTimeRange.php';
		require_once 'include/fields/CurrencyField.php';
		require_once 'include/CRMEntity.php';
		include_once 'modules/Vtiger/CRMEntity.php';
		require_once 'include/runtime/Cache.php';
		require_once 'modules/Vtiger/helpers/Util.php';
		require_once 'modules/PickList/DependentPickListUtils.php';
		require_once 'modules/Users/Users.php';
		require_once 'include/Webservices/Utils.php';
		$registerLink = false;
		if ($eventType === 'module.postinstall') {
			//Add Assets Module to Customer Portal
			$registerLink = true;
			\App\Db::getInstance()->createCommand()->update('vtiger_tab', ['customized' => 0], ['name' => $moduleName])->execute();
			\App\Db::getInstance()->createCommand()->insert('vtiger_apiaddress', ['nominatim' => 0, 'key' => 0, 'source' => 'https://api.opencagedata.com/geocode/v1/', 'min_length' => 3])->execute();
		}
		$displayLabel = 'LBL_API_ADDRESS';
		if ($registerLink) {
			Settings_Vtiger_Module_Model::addSettingsField('LBL_INTEGRATION', [
				'name' => $displayLabel,
				'iconpath' => '',
				'description' => 'LBL_API_ADDRESS_DESCRIPTION',
				'linkto' => 'index.php?module=ApiAddress&parent=Settings&view=Configuration',
			]);
		} else {
			Settings_Vtiger_Module_Model::deleteSettingsField('LBL_INTEGRATION', $displayLabel);
		}
	}
}
