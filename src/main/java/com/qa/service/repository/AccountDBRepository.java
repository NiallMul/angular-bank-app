package com.qa.service.repository;

import static javax.transaction.Transactional.TxType.REQUIRED;
import static javax.transaction.Transactional.TxType.SUPPORTS;

import java.util.Collection;

import javax.enterprise.inject.Default;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.apache.log4j.Logger;

import com.qa.domain.Account;
import com.qa.util.JSONUtil;

@Transactional(SUPPORTS)
@Default
public class AccountDBRepository implements AccountRepository {

	private static final Logger LOGGER = Logger.getLogger(AccountDBRepository.class);

	@PersistenceContext(unitName = "primary")
	private EntityManager manager;

	@Inject
	private JSONUtil util;

	@Override
	public String getAllAccounts() {
		LOGGER.info("AccountDBRepository getAllAccounts");
		Query query = manager.createQuery("Select a FROM Account a");
		Collection<Account> accounts = (Collection<Account>) query.getResultList();
		return util.getJSONForObject(accounts);
	}

	@Override
	@Transactional(REQUIRED)
	public String createAccount(String accout) {
		LOGGER.info("AccountDBRepository createAccount");
		Account anAccount = util.getObjectForJSON(accout, Account.class);
		manager.persist(anAccount);
		return "{\"message\": \"account has been successfully added\"}";
	}

	@Override
	@Transactional(REQUIRED)
	public String deleteAccount(Long id) {
		LOGGER.info("AccountDBRepository deleteAccount");
		Account accountInDB = findAccount(id);
		if (accountInDB != null) {
			manager.remove(accountInDB);
			return "{\"message\": \"account successfully deleted\"}";
		}
		return "{\"message\": \"account not found\"}";

	}
	@Override
	@Transactional(REQUIRED)
	public String updateAccount(String account) {
		LOGGER.info("AccountDBRepository this is the string object: "+account);
		Account accntToUpdate = util.getObjectForJSON(account, Account.class);
		LOGGER.info("AccountDBRepository this is the id: "+accntToUpdate.getFirstName());
		Long id = accntToUpdate.getId();
		Account accntInDB = findAccount(id);
		if(accntInDB!=null) {
			accntInDB.setFirstName(accntToUpdate.getFirstName());
			accntInDB.setSecondName(accntToUpdate.getSecondName());
			accntInDB.setAccountNumber(accntToUpdate.getAccountNumber());

			return "{\"message\": \"account successfully updated\"}";
		}
		return "{\"message\": \"account not updated\"}";
	}
	private Account findAccount(Long id) {
		LOGGER.info("AccountDBRepository findAccount");
		return manager.find(Account.class, id);
	}

	public void setManager(EntityManager manager) {
		this.manager = manager;
	}

	public void setUtil(JSONUtil util) {
		this.util = util;
	}

}
